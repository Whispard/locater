//import fetch from 'node-fetch';
const fetch = require('node-fetch-commonjs');

const baseUrl = 'http://localhost:3000';

const _fetch = async (method, path, body) => {
    body = typeof body == 'string'? body : JSON.stringify(body);
    const headers = {'Content-type':'application/json'}
    const res = await fetch(baseUrl+ path, {method,body,headers});
    if (res.status < 200 || res.status > 299)
        throw new Error(`API returned ${res.status}`);
    return res.json();
}

describe('API Tests', () => {
    test( 'GET /api/locations', async () => {
        const lng = 2;
        const lat = 3;
        const params = `/?lng=${lng}&lat=${lat}`;
        const path = '/api/locations'+params;
        const locations = await _fetch('get',path)
        expect(locations.length).not.toBe(0);
        const location0 = locations[0];
        expect(typeof location0.id).toBe('string');
        expect(location0.name).toMatch(/\w/);
        expect(typeof location0.rating).toBe('number');
        expect(location0.rating).toBeLessThanOrEqual(5);
        expect(location0.rating).toBeGreaterThan(0);
        expect(location0.facilities.length).not.toBe(0);
        expect(typeof location0.distance).toBe('string');

    })

    test('GET /api/locations/:locationid', async () => {
        const locationid = '617f826102583854756711a7';
        const path = '/api/locations/' + locationid
        const location = await _fetch('get',path);
        expect(location.reviews.length).not.toBe(0);
        const r = location.reviews[0];
        expect(typeof r.rating).toBe('number');
        expect(r.rating).toBeLessThanOrEqual(5);
        expect(r.rating).toBeGreaterThan(0);
        expect(typeof r.reviewText).toBe('string');
        expect(r.reviewText.length).not.toBe(0);
        expect(r.author.length).not.toBe(0);
    })
})