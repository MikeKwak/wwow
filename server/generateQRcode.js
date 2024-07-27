const fs = require('fs');
const QRCode = require('qrcode');
const axios = require('axios');

// Load products from the JSON file
const products = require('./products_dataset.json');

// Function to generate a QR code and convert it to binary
async function generateQRCodeBinary(url) {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    const response = await axios.get(qrCodeDataUrl, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

// Function to add the QR code to each product
async function addQRCodeToProducts(products) {
  const updatedProducts = [];
  for (const product of products) {
    const productUrl = `http://localhost:3000/product/${product.productName}`;
    try {
      const qrCodeBinary = await generateQRCodeBinary(productUrl);
      product.qrCode = qrCodeBinary;
      updatedProducts.push(product);
    } catch (error) {
      console.error(`Error processing product ${product.productName}:`, error);
    }
  }
  return updatedProducts;
}

// Main function to run the script
async function main() {
  try {
    const updatedProducts = await addQRCodeToProducts(products);
    fs.writeFileSync(
      './updated_products.json',
      JSON.stringify(updatedProducts, null, 2)
    );
    console.log('Updated products saved to updated_products.json');
  } catch (error) {
    console.error('Error updating products:', error);
  }
}

main();
