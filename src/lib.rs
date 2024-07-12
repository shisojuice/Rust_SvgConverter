use image::{GenericImageView, imageops::FilterType};
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn image_to_path(image_data: &[u8], threshold: u8) -> String {
    let img = image::load_from_memory(image_data).unwrap();
    let img = img.grayscale();
    let img = img.resize(256, 256, FilterType::Nearest);

    let mut path_data = String::new();
    for y in 0..img.height() {
        for x in 0..img.width() {
            let pixel = img.get_pixel(x, y);
            if pixel[0] < threshold {
                path_data.push_str(&format!("M{} {}h1v1h-1z", x, y));
            }
        }
    }

    format!("<svg width=\"{}\" height=\"{}\"><path d=\"{}\" /></svg>", img.width(), img.height(), path_data)
}