const calculateController = (req, res, next) => {
  const { annualInstallmentAmount, annualInterestRate, years } = req.body;
  const totalInvestedAmount = annualInstallmentAmount * years;
  const totalMaturityValue = Math.floor(
    annualInstallmentAmount *
      ((Math.pow(1 + annualInterestRate / 100, years) - 1) /
        (annualInterestRate / 100))
  );
  const totalInterestGained = totalMaturityValue - totalInvestedAmount;
  res.status(200).json({
    success: true,
    msg: "calcuations done!",
    data: { totalInvestedAmount, totalInterestGained, totalMaturityValue },
  });
};

module.exports = { calculateController };
