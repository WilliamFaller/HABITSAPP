//Back-end API RESTful
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes';

const app = Fastify();

/**
 * Metodo HTTP (CRUD): Get, Post, Put, Patch, Delete
 */

app.register(cors)
app.register(appRoutes)

app.listen({
    port: 777,
    }).then(() =>{
    console.log('🔥 Server is Running!');
    
})