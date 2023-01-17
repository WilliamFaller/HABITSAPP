//Back-end API RESTful
import Fastify from 'fastify'
import cors from '@fastify/cors'
import {PrismaClient} from '@prisma/client';

const app = Fastify();
const prisma = new PrismaClient();

/**
 * Metodo HTTP (CRUD): Get, Post, Put, Patch, Delete
 */

app.register(cors)

app.get('/hello', async() => {
    const habits = await prisma.habit.findMany({
        where: {
            title:{
                startsWith: 'Beber'
            }
        }
    });
    return habits;
});

app.listen({port: 777}).then(() =>{
    console.log('🔥 Server is Running!');
    
})