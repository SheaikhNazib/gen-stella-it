// scripts/migrate-images-to-cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// MUST CONFIGURE ENVIRONMENT VARIABLES BEFORE RUNNING!
// npm i -g ts-node
// ts-node scripts/migrate-images-to-cloudinary.ts

const prisma = new PrismaClient();

// SDK auto-reads CLOUDINARY_URL from the environment.
cloudinary.config({ secure: true });

async function uploadToCloudinary(localPath: string, folder: string): Promise<string> {
  const fullPath = path.join(process.cwd(), 'public', localPath);
  if (!fs.existsSync(fullPath)) return localPath; // Already url or doesnt exist

  try {
    const result = await cloudinary.uploader.upload(fullPath, {
      folder: `gen-stella-it/${folder}`,
      use_filename: true,
      unique_filename: false,
    });
    console.log(`Uploaded ${localPath} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${localPath}:`, error);
    return localPath;
  }
}

async function migrate() {
  console.log('Migrating Team Members...');
  const teamMembers = await prisma.teamMember.findMany();
  for (const member of teamMembers) {
    if (member.image && !member.image.startsWith('http')) {
      const newUrl = await uploadToCloudinary(member.image, 'team');
      if (newUrl !== member.image) {
        await prisma.teamMember.update({
          where: { id: member.id },
          data: { image: newUrl },
        });
      }
    }
  }

  console.log('Migrating Portfolio Projects...');
  const projects = await prisma.portfolioProject.findMany();
  for (const project of projects) {
    if (project.image && !project.image.startsWith('http')) {
      const newUrl = await uploadToCloudinary(project.image, 'portfolio');
      if (newUrl !== project.image) {
        await prisma.portfolioProject.update({
          where: { id: project.id },
          data: { image: newUrl },
        });
      }
    }
  }

  // Similar logic can be added for BlogPosts, etc.
  
  console.log('Migration completed!');
}

migrate()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
