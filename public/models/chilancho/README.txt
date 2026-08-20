Put the COMPRESSED model here as: model.glb

Do not drop the raw uploaded .glb in this folder as-is -- see the
project README.md ("Compressing the models") for the gltf-transform
command. The raw files are 40-90MB each; compressed (Draco geometry +
resized/WebP textures) they should land well under 10MB, ideally 2-5MB,
for a usable web load.
