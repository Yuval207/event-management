export const resizeMedia = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (!e.target?.result) {
        reject(new Error('Failed to read file'));
        return;
      }

      const img = new Image();
      img.src = e.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calculate dimensions for 4:5 aspect ratio
        let width = img.width;
        let height = img.height;
        const targetRatio = 4 / 5;
        
        if (width / height > targetRatio) {
          width = height * targetRatio;
        } else {
          height = width / targetRatio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image with new dimensions
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64
        const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
        resolve(resizedImage);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};