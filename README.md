Random - history - TZ-3
RUN:
npm install
ng serve
localhost:4200


Social app:
Social front RUN:
docker built -t social_front .
docker run -p 4200:4200 social_front

Social back RUN:
docker built -t social_back .
docker run -p 8000:8000 social_back
