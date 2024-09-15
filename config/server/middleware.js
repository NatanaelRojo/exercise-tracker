import express from 'express';
import cors from 'cors';

export const setupMiddleware = (app) => {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('public'));
}