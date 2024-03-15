-- Total de Ganhos (earnings)
SELECT SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earnings
FROM transactions
WHERE user_id = '34bf8156-0f98-4c76-8f05-07556b501cff';

-- Total de Despesas (expenses)
SELECT SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses
FROM transactions
WHERE user_id = '34bf8156-0f98-4c76-8f05-07556b501cff';

-- Total de Investimentos (investiments)
SELECT SUM(CASE WHEN type = 'INVESTIMENT' THEN amount ELSE 0 END) as investiments
FROM transactions
WHERE user_id = '34bf8156-0f98-4c76-8f05-07556b501cff';

-- Tabela com Ganhos, Despesas, Investimentos e Saldo
SELECT
	SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earnings,
	SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses,
	SUM(CASE WHEN type = 'INVESTIMENT' THEN amount ELSE 0 END) AS investiments,
	(
		SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END)
		- SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END)
		- SUM(CASE WHEN type = 'INVESTIMENT' THEN amount ELSE 0 END)
	) AS balance
FROM transactions
WHERE user_id = '34bf8156-0f98-4c76-8f05-07556b501cff';