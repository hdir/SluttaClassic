var Camera = _cam;

Camera.getCameraInfo().then(function(info) {
    // getCamereInfo will resolve when the camera is fully loaded
    // so though we dont need the info this gives us a nice callback
    Camera.setCameraFacing(_cam.CAMERA_FACING_FRONT);
});
