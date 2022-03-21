const protoLoader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')

const MESSAGE_PROTO = `${__dirname}/message.proto`

const packageDefinition = protoLoader.loadSync(MESSAGE_PROTO, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
})

const EmployeeInfoService = grpc.loadPackageDefinition(packageDefinition).EmployeeInfoService

const customConfig = {}

const grpcClient = new EmployeeInfoService(
  "localhost:9000",
  grpc.credentials.createInsecure(),
  customConfig
)

const gRPCReq = {
  id: 1,
  name: "John Doe",
  phone_numbers: [12345678, 98765432],
  occupation: "Data Analyst",
  is_working_professional: true
}

grpcClient.employeeInfo(gRPCReq, (err, response) => {
  if (err) {
    console.log(`gRPC Error: ${err}`);
  }
  console.log(`gRPC Response: ${JSON.stringify(response)}`);
})
