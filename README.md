# Mass Conversion Tool

This project is a tool to convert a mass from one unit to another. It also allows the combination of two values to show the total in both units. It is setup as an Express API with an HTML interface made with Bootstrap.

## Prerequisites

- Node.js (can be downloaded from [here](https://nodejs.org/en/download/package-manager))

## How to run

1. Clone repository
    ```
    git clone https://github.com/jos47tl/mass-conversion.git
    ```
2. Install dependencies
    ```
    npm install
    ```
3. Start server
    ```
    npm start
    ```
4. In a browser, enter address [http://localhost:3000](http://localhost:3000/) to show the HTML interface

## API Endpoints

### Single Value Conversion

#### Endpoint

- **GET /api/convert**

#### Parameters

- **value**: The value to be converted

- **fromUnit**: The unit to convert from

- **toUnit**: The unit to convert to

#### Example Request

```
http://localhost:3000/api/convert?value=5&fromUnit=kg&toUnit=lb
```

#### Example Response

```json
{
  "result": 11.023113109
}
```

(The API will return at most 9 digits after the decimal)

### Combine Two Masses

#### Endpoint

- **GET /api/combine**

#### Parameters

- **value1**: The value of the first mass

- **unit1**: The unit of the first mass

- **value2**: The value of the second mass

- **unit2**: The unit of the second mass

- **operation**: The operation used to combine the masses ("add" or "subtract")

#### Example Request

```
http://localhost:3000/api/combine?value1=2&unit1=kg&value2=3&unit2=lb&operation=add
```

#### Example Response

```json
{
  "result1": 3.36077711,
  "result2": 7.409245244
}
```

## Supported Units

Use the following values when selecting units for conversion:

- **kg**: Kilogram

- **g**: Gram

- **lb**: Pound

- **oz**: Ounce

- **t**: Metric ton

- **short_t**: Short ton (US)

- **long_t**: Long ton (UK)
