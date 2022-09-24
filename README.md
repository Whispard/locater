# locater
MEAN app to find nearby shops

# Technology Used:
- Node
- Express (For API & Site) & PUG (Template Engine)
- Angular (Dynamic Frontend)
- mongoose & MongoDB
- Node-fetch 
- requests (API Requests)

#Features:

### gives available nearby shops within given distance:
![image](https://user-images.githubusercontent.com/78078515/192096170-a935c668-4004-4815-b23a-640583661e46.png)

### Check each store's services and place a review:
![image](https://user-images.githubusercontent.com/78078515/192096246-ec14a6e8-1223-40e3-aff2-335796de6970.png)

### Easily Add review with name and rating
![image](https://user-images.githubusercontent.com/78078515/192096293-22ddacf4-a8a0-4025-8590-4c540e0257aa.png)

# Installation
```
git clone https://github.com/Whispard/locater
cd locater
npm install
```
Then in new shell, use
`mongod`
and finally, 'npm start`

You can check database data with MongoDB Compass or change default start data in `app_api/models/location.js`

PUG uses pre-compiled build files from Angular,
to recompile dynamic frontend angular , use `ng build`
