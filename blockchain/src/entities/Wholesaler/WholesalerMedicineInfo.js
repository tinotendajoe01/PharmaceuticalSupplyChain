import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../components/Loader";
import Medicine from "../../build/Medicine.json";
import Transactions from "../../build/Transactions.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomStepper from "../../main_dashboard/components/Stepper/Stepper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function WholesalerMedicineInfo(props) {
  const classes = useStyles();
  const [account] = useState(props.location.query.account);
  const [medicineAddress] = useState(props.location.query.address);
  const [web3] = useState(props.location.query.web3);
  const [supplyChain] = useState(props.location.query.supplyChain);
  const [distributor, setDistributor] = useState("");
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(true);

  async function getMedicineData() {
    let medicine = new web3.eth.Contract(Medicine.abi, medicineAddress);
    let data = await medicine.methods.getMedicineInfo().call({ from: account });
    let subcontractAddress = await supplyChain.methods
      .getSubContractWD(medicineAddress)
      .call({ from: account });
    let status = Number(data[6]);
    let activeStep = status;
    console.log(status);

    if (status === 2) {
      activeStep = 3;
    } else if (status === 3) {
      activeStep = 2;
      // txt = 'Delivered to Wholesaler';
    }
    data[1] = web3.utils.hexToUtf8(data[1]);
    setDistributor(data[5]);

    let display = (
      <div>
        <p style={{ background: "#eeeeee" }}>
          Batch Address: {medicineAddress}
        </p>
        <p style={{ background: "#eeeeee" }}>Batch Manufacturer: {data[0]}</p>
        <p style={{ background: "#eeeeee" }}>Description: {data[1]}</p>
        <p style={{ background: "#eeeeee" }}>Batcht Raw Materials: {data[2]}</p>
        <p style={{ background: "#eeeeee" }}> Batch Quantity: {data[3]}</p>
        <p style={{ background: "#eeeeee" }}>Batch Transporter: {data[4]}</p>
        <p style={{ background: "#eeeeee" }}>Batch Wholesaler: {data[8]}</p>
        <p style={{ background: "#eeeeee" }}>Batch Distributor: {data[5]}</p>
        <p style={{ background: "#eeeeee" }}>
          Batch Transaction contract address:{" "}
          <Link
            to={{
              pathname: `/wholesaler/view-transaction/${data[7]}`,
              query: { address: data[7], account: account, web3: web3 },
            }}
          >
            {data[7]}
          </Link>
          <p>Subcontract Address: {subcontractAddress}</p>
        </p>
        <CustomStepper
          getSteps={getSupplyChainSteps}
          activeStep={activeStep}
          getStepContent={getSupplyChainStepContent}
        />
      </div>
    );
    setDetails(display);
    isLoading(false);
  }
  function getSupplyChainSteps() {
    return [
      "At Manufacturer",
      "Collected by Transporter",
      "Delivered to Wholesaler",
      "Collected by Transporter",
      "Delivered to Distributor",
      "Collected by Transporter",
      "Medicine Delivered",
    ];
  }

  function getSupplyChainStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return " Batch at manufacturing stage in the supply chain.";
      case 1:
        return " Batch collected by the Transporter is on its way to you.";
      case 2:
        return "Wholesaler, the Batch is currently with you!";
      case 3:
        return " Batchis collected by the Transporter! On its way to the Distributor.";
      case 4:
        return " Batch is delivered to the Distributor";
      case 5:
        return " Batch collected by Transporter is on its way to the pharmacy/customer.";
      case 6:
        return " Batch Delivered Successfully!";
      default:
        return "Unknown stepIndex";
    }
  }

  function sendPackage() {
    let medicine = new web3.eth.Contract(Medicine.abi, medicineAddress);
    let signature = prompt("Enter signature");
    supplyChain.methods
      .sendPackageToEntity(distributor, account, medicineAddress, signature)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        let data = await medicine.methods
          .getMedicineInfo()
          .call({ from: account });
        let txnContractAddress = data[7];
        let transporterAddress = data[4][data[4].length - 1];
        let txnHash = receipt.transactionHash;
        const transactions = new web3.eth.Contract(
          Transactions.abi,
          txnContractAddress
        );
        let txns = await transactions.methods
          .getAllTransactions()
          .call({ from: account });
        let prevTxn = txns[txns.length - 1][0];
        transactions.methods
          .createTxnEntry(
            txnHash,
            account,
            transporterAddress,
            prevTxn,
            "10",
            "10"
          )
          .send({ from: account });
      });
  }

  useEffect(() => {
    getMedicineData();
  }, []);

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div>
        <h1>Drug Batch Details</h1>
        <p>{details}</p>
        <Button variant="contained" color="primary">
          <Link
            to={{
              pathname: `/wholesaler/view-request/${medicineAddress}`,
              query: {
                address: medicineAddress,
                account: account,
                web3: web3,
                supplyChain: supplyChain,
              },
            }}
          >
            View Requests
          </Link>
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={sendPackage}>
          Send Package
        </Button>
      </div>
    );
  }
}