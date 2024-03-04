import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import * as _ from 'lodash';

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [pageLimit, setPageLimit] = useState(3);
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const url = "/api/movies";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        console.log(res)
        const activity_ids = res.map(({ activity_id }) => activity_id);
        const uniqueTransaction = res.filter(({ activity_id }, index) => !activity_ids.includes(activity_id, index + 1));

        const sortedTransaction = uniqueTransaction.sort((left, right) => {
          return moment.utc(right.date).diff(moment.utc(left.date))
        });
        setBalance(sortedTransaction[0].balance);
        setTransactions(sortedTransaction.slice(0, pageLimit))
      })
      .catch(() => navigate("/"));
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // const allTransactions = transactions.map((transaction, index) => 
  //   <Transaction index={index}
  //     dateTime={transaction.date} 
  //     type={transaction.type}
  //     method={transaction.method}
  //     source={transaction.source}
  //     destination={transaction.destination} 
  //     amount={transaction.amount}
  //     balance={transaction.balance}
  //     formatter={formatter}
  //   />
  // );

  return (
    <>
      {/* <div class="h-screen flex-grow-1 overflow-y-lg-auto">
        <header class="bg-surface-primary border-bottom pt-6">
          <div class="container-fluid">
            <div class="mb-npx">
              <div class="row align-items-center">
                <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                  <h1 class="fw-normal mb-1">Your Accounts</h1>
                  <p class="text-muted mb-0">Dashboard</p>
                </div>
              </div>
              <ul class="nav nav-tabs mt-4 overflow-x border-0">
                <li class="nav-item ">
                  <a href="#" class="nav-link active">Portfolio</a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main class="py-6 bg-surface-secondary">
          <div class="container-fluid">
            <div class="row g-8 mb-8">
              <div class="col-xl-4 col-sm-6 col-12">
                <div class="card shadow border-0">
                  <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <span class="h6 font-semibold text-muted text-sm d-block mb-2">Budget</span>
                            <span class="h3 font-bold mb-0">{formatter.format(balance)}</span>
                        </div>
                        <div class="col-auto">
                            <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                <i class="bi bi-credit-card"></i>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card shadow border-0 mb-7">
                <div class="card-header">
                    <h5 class="mb-0">Recent Transactions</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <TransactionHeader/>
                  {allTransactions}
                </ul>

                <div class="card-footer border-0 py-5">
                    <span class="text-muted text-sm">Showing last {pageLimit} transactions</span>
                </div>
            </div>
          </div>
        </main>
      </div> */}
    </>
  );
};

export default Dashboard;
