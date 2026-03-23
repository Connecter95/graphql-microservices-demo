# GraphQL + Node.js Microservices

This project demonstrates a GraphQL API acting as an orchestrator for two Node.js microservices.

## Structure

```text
graphQL/
├── graphql-api/
├── microservice-a/
└── microservice-b/
```

## Services

### 1. GraphQL API

- Port: `4000`
- Endpoint: `http://localhost:4000/graphql`
- Responsibility: Calls both REST services and combines their responses.

### 2. Microservice A

- Port: `3001`
- Endpoint: `GET http://localhost:3001/data`

### 3. Microservice B

- Port: `3002`
- Endpoint: `GET http://localhost:3002/data`

## Install

Run these commands in separate terminals:

```powershell
cd microservice-a
npm install
```

```powershell
cd microservice-b
npm install
```

```powershell
cd graphql-api
npm install
```

## Start

Start each service in its own terminal:

```powershell
cd microservice-a
npm start
```

```powershell
cd microservice-b
npm start
```

```powershell
cd graphql-api
npm start
```

## Test the REST Services

Microservice A:

```powershell
Invoke-RestMethod http://localhost:3001/data
```

Microservice B:

```powershell
Invoke-RestMethod http://localhost:3002/data
```

## Test GraphQL

Open the GraphQL endpoint and run:

```graphql
query {
  combinedData {
    serviceA
    serviceB
  }
}
```

Expected result:

```json
{
  "data": {
    "combinedData": {
      "serviceA": "Hello from Microservice A",
      "serviceB": "Hello from Microservice B"
    }
  }
}
```

## Learning Notes

- `graphql-api/server.js` contains the GraphQL schema and resolver.
- The resolver uses `fetch()` to call both microservices in parallel.
- Each microservice returns static mock JSON so you can focus on service communication.

## Optional Extensions

Try these next:

1. Add query arguments like `combinedData(name: String)`.
2. Simulate delays with `setTimeout`.
3. Return partial data if one service fails.
4. Add another field such as `serviceName` from each microservice.
