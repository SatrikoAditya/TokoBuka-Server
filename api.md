**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   'none'

* **Data Params**

  ```json
    {
        "name":"string",
        "image_url":"string",
        "price": "integer",
        "stock": "integer"
    }
  ```

  * **Headers**

  ```json
  token: "string"
  ```

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "message": "create new product success",
        "data": {
            "id": "integer",
            "name": "string",
            "image_url": "string",
            "price": "integer",
            "stock": "integer",
            "userEmail": "string",
            "updatedAt": "timestamp",
            "createdAt": "timestamp"
            }
    }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ errors : "Internal server error" }`
  
OR

  * **Code:** 400 SequelizeValidationError <br />
    **Content:** `{ errors : "name is required" }`

OR

  * **Code:** 403 AUTHORIZATION_FAILED <br />
    **Content:** `{ errors : "forbidden access" }




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**

   'none'

* **Data Params**

  'none'

* **Headers**

  ```json
  token: "string"
  ```

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      {
        data: [
            {
                "id": "integer",
                "name": "string",
                "image_url": "string",
                "price": "integer",
                "stock": "integer",
                "createdAt": "timestamp",
                "updatedAt": "timestamp"
            }
        ]
      }
    ]
    
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ errors : "Internal server error" }`

    OR

  * **Code:** 400 JsonWebTokenError <br />
    **Content:** `{ errors : "invalid Token" }

    OR

  * **Code:** 403 AUTHORIZATION_FAILED <br />
    **Content:** `{ errors : "forbidden access" }




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /products

* **Method:**

  `PUT`
  
*  **URL Params**

  **Required:**
 
  `id=[integer]`

* **Data Params**

    ```json
    {
        "name":"string",
        "image_url":"string",
        "price": "integer",
        "stock": "integer"
    }
  ```

* **Headers**

  ```json
  token: "string"
  ```

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "message": "success edit data"
    }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`
  
  OR

  * **Code:** 400 SequelizeValidationError <br />
    **Content:** `{ error : "name is required" }`
    
  OR

  * **Code:** 403 AUTHORIZATION_FAILED <br />
    **Content:** `{ error : "forbidden access" }`




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /products

* **Method:**

  `DELETE`
  
*  **URL Params**

  **Required:**
 
  `id=[integer]`

* **Data Params**

  'none'

* **Headers**

  ```json
  token: "string"
  ```

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "message": "success delete data",
    }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`

  OR

  * **Code:** 403 AUTHORIZATION_FAILED <br />
    **Content:** `{ error : "forbidden access" }`




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**
  
  'none'

* **Data Params**

  ```json
    {
        "email":"string",
        "password":"string"
    }
  ```

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
          "message": "string",
          "token": "string"
      }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ errors : "Internal server error" }`

  OR

  * **Code:** 400 LOGIN_FAILED <br />
    **Content:** `{ errors : "Invalid email or password" }`

