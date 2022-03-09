const main = async () => {
  // const Transactions = await hre.ethers.getContractFactory("Medical");
  // const transactions = await Transactions.deploy();

  // await transactions.deployed();

  // console.log("Transactions deployed to:", transactions.address);
  const bodyExamine = await hre.ethers.getContractFactory("BodyExamine");
  const bodyExamineContract = await bodyExamine.deploy();
  await bodyExamineContract.deployed();
  console.log("BodyExamine deployed to:", bodyExamineContract.address);

  const Doctor = await hre.ethers.getContractFactory("Doctor");
  const doctorContract = await Doctor.deploy();
  await doctorContract.deployed();
  console.log("Doctor deployed to:", doctorContract.address);

  const Patient = await hre.ethers.getContractFactory("Patient");
  const patientContract = await Patient.deploy();
  await patientContract.deployed();
  console.log("Patient deployed to:", patientContract.address);

  const Hospital = await hre.ethers.getContractFactory("Hospital");
  const hospitalContract = await Hospital.deploy();
  await hospitalContract.deployed();
  console.log("Hospital deployed to:", hospitalContract.address);

  const Records = await hre.ethers.getContractFactory("Records");
  const recordsContract = await Records.deploy();
  await recordsContract.deployed();
  console.log("Records deployed to:", recordsContract.address);  
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

