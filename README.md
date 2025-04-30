# Random - history

## RUN:
```bash
npm install
ng serve
localhost:4200
```

## Social app:

### Social front RUN:
```bash
docker build -t social_front .
docker run -p 4200:4200 social_front
```

### Social back RUN:
```bash
docker build -t social_back .
docker run -p 8000:8000 social_back
```
