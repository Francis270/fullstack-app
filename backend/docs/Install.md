DEV

start docker
```
sudo systemctl start docker.service
```

compose
```
sudo docker compose up -d
```

install dependencies
```
npm install
```

init db
```
npx prisma migrate dev --name init
```

start server
```
npm run dev
```