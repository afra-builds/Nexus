import { useState } from 'react';
import { Wallet, ArrowUp, ArrowDown, Send, History, CheckCircle, XCircle } from 'lucide-react';

const PaymentPage = () => {
  // user info
  const [balance, setBalance] = useState(25000);
  const [amount, setAmount] = useState('');
  const [transferEmail, setTransferEmail] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  // transactions list
  const [transactions, setTransactions] = useState([
    { id: 1, amount: 5000, type: 'Deposit', from: 'Sarah Johnson', to: 'Wallet', date: '2026-05-20', status: 'Success' },
    { id: 2, amount: 2000, type: 'Withdraw', from: 'Wallet', to: 'Sarah Johnson', date: '2026-05-18', status: 'Success' },
    { id: 3, amount: 10000, type: 'Investment', from: 'Michael Rodriguez', to: 'Sarah Johnson', date: '2026-05-15', status: 'Success' },
  ]);

  // funding requests from investors to entrepreneur
  const [fundingRequests, setFundingRequests] = useState([
    { id: 1, from: 'Michael Rodriguez', amount: 15000, message: 'Want to invest in your startup', status: 'pending' },
    { id: 2, from: 'Jennifer Lee', amount: 25000, message: 'Great potential! Ready to invest', status: 'pending' },
  ]);

  // deposit money
  const handleDeposit = () => {
    let amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert('Enter valid amount');
      return;
    }

    setBalance(balance + amt);
    setTransactions([
      { id: Date.now(), amount: amt, type: 'Deposit', from: 'You', to: 'Wallet', date: new Date().toISOString().split('T')[0], status: 'Success' },
      ...transactions
    ]);
    setAmount('');
    alert(`$${amt} added to wallet`);
  };

  // withdraw money
  const handleWithdraw = () => {
    let amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert('Enter valid amount');
      return;
    }
    if (amt > balance) {
      alert('Not enough balance');
      return;
    }

    setBalance(balance - amt);
    setTransactions([
      { id: Date.now(), amount: amt, type: 'Withdraw', from: 'Wallet', to: 'You', date: new Date().toISOString().split('T')[0], status: 'Success' },
      ...transactions
    ]);
    setAmount('');
    alert(`$${amt} withdrawn`);
  };

  // send money to someone
  const handleTransfer = () => {
    let amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) {
      alert('Enter valid amount');
      return;
    }
    if (amt > balance) {
      alert('Not enough balance');
      return;
    }
    if (!transferEmail) {
      alert('Enter receiver email');
      return;
    }

    setBalance(balance - amt);
    setTransactions([
      { id: Date.now(), amount: amt, type: 'Transfer', from: 'You', to: transferEmail, date: new Date().toISOString().split('T')[0], status: 'Success' },
      ...transactions
    ]);
    setTransferAmount('');
    setTransferEmail('');
    alert(`$${amt} sent to ${transferEmail}`);
  };

  // accept funding from investor
  const acceptFunding = (id: number) => {
    let req = fundingRequests.find(r => r.id === id);
    if (req) {
      setBalance(balance + req.amount);
      setTransactions([
        { id: Date.now(), amount: req.amount, type: 'Investment', from: req.from, to: 'You', date: new Date().toISOString().split('T')[0], status: 'Success' },
        ...transactions
      ]);
      setFundingRequests(fundingRequests.filter(r => r.id !== id));
      alert(`$${req.amount} received from ${req.from}`);
    }
  };

  // decline funding
  const declineFunding = (id: number) => {
    setFundingRequests(fundingRequests.filter(r => r.id !== id));
    alert('Funding request declined');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Center</h1>

      {/* Row 1: Balance + Deposit/Withdraw + Transfer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Wallet size={24} />
            <span className="text-lg font-medium">Total Balance</span>
          </div>
          <p className="text-4xl font-bold">${balance.toLocaleString()}</p>
          <p className="text-sm opacity-80 mt-2">Ready to use</p>
        </div>

        {/* Deposit / Withdraw Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md border">
          <h2 className="text-lg font-semibold mb-3">Add or Withdraw</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full border rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-3">
            <button onClick={handleDeposit} className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 flex items-center justify-center gap-1">
              <ArrowUp size={16} /> Deposit
            </button>
            <button onClick={handleWithdraw} className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 flex items-center justify-center gap-1">
              <ArrowDown size={16} /> Withdraw
            </button>
          </div>
        </div>

        {/* Transfer Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md border">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Send size={18} /> Send Money
          </h2>
          <input
            type="email"
            value={transferEmail}
            onChange={(e) => setTransferEmail(e.target.value)}
            placeholder="Receiver email"
            className="w-full border rounded-xl px-4 py-2 mb-2"
          />
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Amount"
            className="w-full border rounded-xl px-4 py-2 mb-3"
          />
          <button onClick={handleTransfer} className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2">
            <Send size={16} /> Transfer
          </button>
        </div>
      </div>

      {/* Funding Deals Row (Investor to Entrepreneur) */}
      {fundingRequests.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-md border mb-6">
          <h2 className="text-xl font-bold mb-4">💰 Funding Requests from Investors</h2>
          <div className="space-y-4">
            {fundingRequests.map(req => (
              <div key={req.id} className="border rounded-xl p-4 bg-yellow-50 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <p className="font-semibold text-lg">{req.from}</p>
                  <p className="text-sm text-gray-600">{req.message}</p>
                  <p className="text-green-700 font-bold mt-1">Amount: ${req.amount.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => acceptFunding(req.id)} className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 flex items-center gap-1">
                    <CheckCircle size={16} /> Accept
                  </button>
                  <button onClick={() => declineFunding(req.id)} className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 flex items-center gap-1">
                    <XCircle size={16} /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white rounded-2xl p-5 shadow-md border">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <History size={20} /> Transaction History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-gray-600">
                <th className="pb-2">Amount</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">From</th>
                <th className="pb-2">To</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b">
                  <td className={`py-3 font-medium ${tx.type === 'Deposit' || tx.type === 'Investment' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'Deposit' || tx.type === 'Investment' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tx.type === 'Deposit' ? 'bg-green-100 text-green-700' :
                      tx.type === 'Withdraw' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{tx.from}</td>
                  <td className="py-3 text-gray-600">{tx.to}</td>
                  <td className="py-3 text-gray-500">{tx.date}</td>
                  <td className="py-3 text-green-600">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;