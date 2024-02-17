# 과제

이 프로젝트는 **mysql 시퀄라이즈**를 사용합니다.

## 프로젝트 실행 순서

### hardhat

1. 프로젝트에서 사용할 데이터베이스 명을 생성합니다.
   ```
   create database example
   ```
2. `hardhat/database/config/config.json`에서 `development` 부분에 유저정보와 데이터베이스명을 알맞게 입력합니다.
3. 필요한 패키지를 설치합니다:
   ```
   npm i
   ```
4. `hardhat` 폴더에서 다음 명령을 실행합니다:
   ```
   npx hardhat run scripts/deploy.js --network holesky
   ```

- 실행시 컨트랙트 관련 데이터베이스 자동 생성 및 관련 데이터 생성

5. 테스트코드 실행:

   ```
   npx hardhat test
   ```

#### 설정

- `hardhat.config.js`

### server

1.  `server/database/config/config.json`에서 `development` 부분에 유저정보와 데이터베이스명을 알맞게 입력합니다.
2.  필요한 패키지를 설치합니다:

    ```
    npm i
    ```

3.  서버를 실행합니다:

    ```
    npm run dev
    ```

- 서버 실행 시 데이터 베이스 자동 생성

**테스트를 진행 할 시 서버가 실행되어 있어야 합니다.**

4. 로직 테스트를 위한 유저 월렛 생성:

   ```
   node test/createWallet.js
   ```

5. API 테스트:

   ```
   node test/test.js
   ```

6. Minting 테스트:

   ```
   node test/mintingTest.js
   ```

#### 설정

- `.env`

**참고:**

- hardhat과 server는 같은 데이터베이스를 사용해야합니다.
- transaction은 1559를 사용하여 처리합니다.
- multi signer, batch contract를 이용하였습니다.
- 빠른실행을 위해 gitignore를 사용하지 않았습니다.
