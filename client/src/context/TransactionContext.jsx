import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { abi, contract_address } from "../utils/Medical.json";
const contractABI = abi;
const contractAddress = contract_address;

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  // console.log(transactionsContract);
  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getHospital(
          currentAccount
        );

        // const structuredTransactions = availableTransactions.map(
        //   (transaction) => ({
        //     addressTo: transaction.receiver,
        //     addressFrom: transaction.sender,
        //     timestamp: new Date(
        //       transaction.timestamp.toNumber() * 1000
        //     ).toLocaleString(),
        //     message: transaction.message,
        //     keyword: transaction.keyword,
        //     amount: parseInt(transaction.amount._hex) / 10 ** 18,
        //   })
        // );

        setTransactions(availableTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDoctors = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getDoctors(
          currentAccount
        );

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            d_address: transaction.d_address,
            name: transaction.name,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
          })
        );
        console.log(structuredTransactions);
        setDoctors(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
        getAllDoctors();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const currentTransactionCount = await transactionsContract.getHospital(
          currentAccount
        );
        // console.log(currentTransactionCount);

        setTransactionCount(1);
      }
    } catch (error) {
      console.log(error);

      // throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  // add hospital
  const sendTransaction = async (formData) => {
    try {
      if (ethereum) {
        const { h_owner, name } = formData;
        const transactionsContract = createEthereumContract();

        const transactionHash = await transactionsContract.addHospital(
          h_owner,
          name
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        setTransactionCount((prev) => prev + 1);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  // add doctor
  const addDoctor = async (formData) => {
    try {
      if (ethereum) {
        const { d_address, name } = formData;
        const transactionsContract = createEthereumContract();

        const transactionHash = await transactionsContract.addDoctor(
          d_address,
          name
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        setTransactionCount((prev) => prev + 1);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount, currentAccount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        doctors,
        currentAccount,
        isLoading,
        sendTransaction,
        addDoctor,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
