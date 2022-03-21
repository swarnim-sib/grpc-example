const protoLoader = require("@grpc/proto-loader");
const grpc = require('@grpc/grpc-js');

const MESSAGE_PROTO_PATH = __dirname + "/message.proto";

const packageDefinition = protoLoader.loadSync(MESSAGE_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});

const EmpService = grpc.loadPackageDefinition(packageDefinition).EmployeeInfoService;

function EmployeeInfo(call, callback) {
  console.log(`Recieved input ${JSON.stringify(call.request)}`);
  callback(null, { response_code: grpc.status.OK, message: "Successfully sent message using gRPC" });
}

function getServer() {
  const server = new grpc.Server();
  server.addService(EmpService.service, {
    employeeInfo: EmployeeInfo
  });
  return server;
}
const routeServer = getServer();
routeServer.bindAsync('localhost:9000', grpc.ServerCredentials.createInsecure(), () => {
  console.log("Server starting...");
  routeServer.start();
});
