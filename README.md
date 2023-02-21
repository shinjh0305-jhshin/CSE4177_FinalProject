# CSE4177_FinalProject
Final Project for Sogang Univ. CSE4177 by Prof.Jongho Nang    
   
<img src="https://user-images.githubusercontent.com/101303759/220225082-217cdfaa-24d0-4444-a0e4-3a1dad5f8df0.PNG" width="1000px" alt="커버 이미지"></img> 
   
기본 작동 구조
---------------
   
<img src="https://user-images.githubusercontent.com/101303759/220225711-c14b1761-b83a-449e-9101-75d498f1e275.PNG" width="500px" alt="기본 작동 구조"></img> 
<img src="https://user-images.githubusercontent.com/101303759/220226179-294623d4-52d4-4130-b731-a4512d0f0873.PNG" width="500px" alt="구조도"></img>   
<img src="https://user-images.githubusercontent.com/101303759/220226492-95116fb7-0ec3-4e0a-97bd-7d262ecb620f.PNG" width="500px" alt="개발내용"></img>
<img src="https://user-images.githubusercontent.com/101303759/220226622-1837affa-fbfb-466b-9616-0f68ef91571f.PNG" width="500px" alt="흐름도"></img>   
    
사용 기술 스택
---------------
   
<img src="https://user-images.githubusercontent.com/101303759/220225990-79c1bae7-33fd-474e-9d5f-b3c7934a33c8.PNG" width="800px" alt="사용 기술 스택"></img> 

향후 개선 방안
---------------
   
<img src="https://user-images.githubusercontent.com/101303759/220227247-d264b8ec-708d-4b56-a917-9aa391fbf987.PNG" width="500px" alt="향후 개선 방안"></img>
<img src="https://user-images.githubusercontent.com/101303759/220227359-49b4362e-b718-4d1f-969a-289b3fc598a5.PNG" width="500px" alt="향후 UI 개선 방안"></img> 

프로젝트 시작하기
---------------
우선 모든 폴더를 다운받은 뒤, MongoDB Atlas에 가입하여 개인 계정을 만들어야 한다.   
### 1. 서버 시작하기
```
cd ./server
npm install
vi .env

// == start of your .env file
DB_URL="mongodb+srv://your.db.address"
// == end of your .env file

npx nodemon
```
### 2. 클라이언트 시작하기
```
cd ./client
npm install
npm run dev
```
### 3. 웹 어플리케이션 시작하기
* 부동산 수익률 검색기 : <http://localhost:5173>   
<br/>

프로젝트 관련 문서
-----------------
* 발표 및 시연 동영상 : <https://drive.google.com/drive/folders/1_skkB6grVre7Ig_NSVeKcU3xkbePFxpl?usp=sharing>
* API Docs : <https://documenter.getpostman.com/view/22330458/2s8Z6x3tWQ>
