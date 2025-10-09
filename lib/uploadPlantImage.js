import { dataURLtoFile, uploadPlantImage } from '@/lib/imageStorage';

const file = dataURLtoFile(base64Image, 'plant.jpg');
const imageUrl = await uploadPlantImage(file, user.id); // ✅ uploads to Supabase Storage
