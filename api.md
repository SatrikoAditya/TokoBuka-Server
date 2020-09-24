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




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /customers/register

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
          "id": "integer",
          "email": "string"
      }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ errors : "Internal server error" }`

  OR

  * **Code:** 400 SequelizeValidationError <br />
    **Content:** `{ error : "email is required" }`




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /customers/login

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
          "id": "integer",
          "email": "string",
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




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /products/customers

* **Method:**

  `GET`
  
*  **URL Params**

   'none'

* **Data Params**

  'none'

* **Headers**

 'none'

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




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /carts

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
    "product": [
        {
            "userId": "integer",
            "productId": "integer",
            "total": "integer",
            "status": "string",
            "createdAt": "timestamps",
            "updatedAt": "timestamps",
            "Product": {
                "id": "integer",
                "name": "string",
                "image_url": "string",
                "price": "integer",
                "stock": "integer",
                "createdAt": "timestamps",
                "updatedAt": "timestamps"
            }
        }
    ],
    "totalPrice": "integer"
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ errors : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`



**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /carts/history

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
    "product": [
        {
            "userId": "integer",
            "productId": "integer",
            "total": "integer",
            "status": "string",
            "createdAt": "timestamps",
            "updatedAt": "timestamps",
            "Product": {
                "id": "integer",
                "name": "string",
                "image_url": "string",
                "price": "integer",
                "stock": "integer",
                "createdAt": "timestamps",
                "updatedAt": "timestamps"
            }
        }
    ],
    "totalPrice": "integer"
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ errors : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /carts

* **Method:**

  `POST`
  
*  **URL Params**

  **Required:**
 
  `productId=[integer]`

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
      "addResult": {
          "userId": "integer",
          "productId": "integer",
          "total": "integer",
          "status": "string",
          "updatedAt": "timestamps",
          "createdAt": "timestamps"
      }
    }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /carts/plus

* **Method:**

  `PATCH`
  
*  **URL Params**

  **Required:**
 
  `productId=[integer]`

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
      "result": {
          "userId": "integer",
          "productId": "integer",
          "total": "integer",
          "status": "string",
          "createdAt": "timestamps",
          "updatedAt": "timestamps",
          "Product": {
              "id": "integer",
              "name": "string",
              "image_url": "string",
              "price": "integer",
              "stock": "integer",
              "createdAt": "timestamps",
              "updatedAt": "timestamps"
          }
      }
    }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`



**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /carts/min

* **Method:**

  `PATCH`
  
*  **URL Params**

  **Required:**
 
  `productId=[integer]`

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
      "result": {
          "userId": "integer",
          "productId": "integer",
          "total": "integer",
          "status": "string",
          "createdAt": "timestamps",
          "updatedAt": "timestamps",
          "Product": {
              "id": "integer",
              "name": "string",
              "image_url": "string",
              "price": "integer",
              "stock": "integer",
              "createdAt": "timestamps",
              "updatedAt": "timestamps"
          }
      }
    }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`



**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /carts

* **Method:**

  `DELETE`
  
*  **URL Params**

  **Required:**
 
  `productId=[integer]`

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
        "message": "Success remove product from cart!",
    }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`




**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /carts

* **Method:**

  `DELETE`
  
*  **URL Params**

  **Required:**
 
  `none`

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
        "message": "Success Clear History",
    }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`





**Ecommerce-Server**
----
  'Ecommerce-Server'

* **URL**

  /carts/checkout

* **Method:**

  `PATCH`
  
*  **URL Params**

  **Required:**
 
  `none`

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
        "message": "Checkout Success!",
    }
  ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 Internal server error <br />
    **Content:** `{ error : "Internal server error" }`

  OR

  * **Code:** 404 DATA_NOT_FOUND <br />
    **Content:** `{ error : "Data not found" }`

