using Uno;
using Uno.Collections;
using Uno.Compiler.ExportTargetInterop;
using Uno.Graphics;
using Uno.IO;
using Uno.Threading;
using Fuse;
using Fuse.Input;
using Fuse.Scripting;

using OpenGL;

[ForeignInclude(Language.ObjC, "OpenGLES/ES2/glext.h")]
[Require("Source.Include", "uBase/Buffer.h")]
[Require("Source.Include", "uImage/Bitmap.h")]
[Require("Source.Include", "uImage/Png.h")]
[Require("Source.Include", "uBase/Memory.h")]

public class SavePanel : Fuse.Controls.Panel
{
	// string _savefn;
	// bool _captureNextFrame;
    static object _resolveLock = new object();
    static List<SavePanelImage> _promises = new List<SavePanelImage>();

	static SavePanel()
	{
		ScriptClass.Register(typeof(SavePanel),
                             new ScriptPromise<SavePanel,string,string>("save", ExecutionThread.MainThread, Save));

	}

	static Future<string> Save(Context c, SavePanel s, object[] args)
    {
        return new SavePanelImage(s, (args.Length != 1) ? null : args[0].ToString());
	}

    internal class SavePanelImage : Promise<string>
    {
        SavePanel _panel;
        string _path;

        public SavePanelImage(SavePanel panel, string path)
        {
            _panel = panel;
            _path = path;
            if (path == null)
            {
                debug_log("SavePanel.save requires 1 parameter (filename)");
                Reject("SavePanel.save requires 1 parameter (filename)");
                return;
            }
            lock (_resolveLock)
            {
                _promises.Add(this);
            }
            debug_log "SavePanel requesting save";
            panel.InvalidateVisual();
        }

        public void Save(byte[] buffer, int width, int height)
        {
            debug_log "Captured. Saving to " + _path;
            _panel.SavePng(buffer, width, height, _path);
            Resolve(_path);
        }

        void Reject(string reason) { Reject(new Exception(reason)); }
    }

	bool TryGetCaptureRect(out Recti rect)
	{
		var bounds = RenderBoundsWithEffects;
		if (bounds.IsInfinite || bounds.IsEmpty)
		{
			rect = new Recti(0,0,0,0);
			return false;
		}

		var scaled = Rect.Scale(bounds.FlatRect, AbsoluteZoom);
		int2 origin = (int2)Math.Floor(scaled.LeftTop);
		int2 size = (int2)Math.Ceil(scaled.Size);
		rect = new Recti(origin.X, origin.Y, origin.X + size.X, origin.Y + size.Y);
		return true;
	}

	float2 _lastsize = float2(0);
	protected override void DrawWithChildren(DrawContext dc)
	{
		if (_promises.Count > 0)
		{
			Recti rect;
			if (!TryGetCaptureRect(out rect))
			{
				debug_log "failed to get capture-rectangle, falling back to scissor-box";
				rect = dc.Scissor;
			}

			var size = rect.Size;

			var fb = new framebuffer(size, Format.RGBA8888, FramebufferFlags.None);
			var cc = new OrthographicFrustum
			{
				Origin = float2(rect.Minimum.X, rect.Minimum.Y) / AbsoluteZoom,
				Size = float2(size.X, size.Y) / AbsoluteZoom,
				LocalFromWorld = WorldTransformInverse
			};

			dc.PushRenderTargetFrustum(fb, cc);

			dc.Clear(float4(0));
			dc.Clear(float4(0.5f, 0, 0.5f, 0.5f));
			base.DrawWithChildren(dc);

			var buffer = new byte[size.X * size.Y * 4];
			GL.PixelStore(GLPixelStoreParameter.PackAlignment, 1);
			GL.ReadPixels(0, 0, size.X, size.Y, GLPixelFormat.Rgba, GLPixelType.UnsignedByte, buffer);

			dc.PopRenderTargetFrustum();

            lock (_resolveLock)
            {
                foreach (var promise in _promises)
                {
                    promise.Save(buffer, size.X, size.Y);
                }
                _promises.Clear();
            }
			fb.Dispose();
		}
		base.DrawWithChildren(dc);
	}

	extern(!CPlusPlus)
    void SavePng(byte[] data, int w, int h, string path)
    {
		debug_log("SavePanel.save not working in local preview yet");
	}

    extern(CPlusPlus)
    void SavePng(byte[] data, int w, int h, string path)
	@{
/*		try
		{ */
			uBase::Buffer *buf = uBase::Buffer::CopyFrom(data, w * h * 4);

			uImage::Bitmap *bmp = new uImage::Bitmap(w, h, uImage::FormatRGBA_8_8_8_8_UInt_Normalize);
			int pitch = w * 4;
			// OpenGL stores the bottom scan-line first, PNG stores it last. Flip image while copying to compensate.
			for (int y = 0; y < h; ++y) {
				uint8_t *src = ((uint8_t*)data->Ptr()) + y * pitch;
				uint8_t *dst = bmp->GetScanlinePtr(h - y - 1);
				memcpy(dst, src, pitch);
			}

			uCString cstr(path);
			uImage::Png::Save(uBase::String(cstr.Ptr, (int) cstr.Length), bmp);
			delete bmp;
/*		}
		catch (const uBase::Exception &e)
		{
			U_THROW(@{Uno.Exception(string):New(uStringFromXliString(e.GetMessage()))});
		} */
	@}

}
