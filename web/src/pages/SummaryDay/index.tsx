import { useEffect, useState } from "react";
import CardSummaryTransaction from "../../components/CardSummaryTransaction";
import Header from "../../components/Header";
import style from './styles.module.css'
import { api } from "../../api";
import { TransactionsProps } from "../../types";
import Tag from "../../components/Tag";

export default function SummaryDay() {
  const [ transactions, setTrasactions ] = useState<TransactionsProps[]>([] as any)

  async function getTransactions() {
    await api.get("/transactions/", { params: { date: '2024-12-27' } }).then((x) => setTrasactions(x.data)).then(() => console.log(transactions))
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <>
      <Header />
      <main id={style.summaryDay}>
        <div className="container">
          <div className="content">
            <div className={style.summaryTransactionInfo}>
              <div className={style.summaryTransactionInfoHeader}>
                <h3>Resumo do dia</h3>
                <p>abaixo o resumo das transações realizadas hoje</p>
              </div>
              <div className={style.cards}>
                <div className={style.treeTransa}>
                  <CardSummaryTransaction type="input" valueCurrent={992} valueBack={764} />
                  <CardSummaryTransaction type="output" valueCurrent={992} valueBack={764} />
                  <CardSummaryTransaction type="total" valueCurrent={992 + 760}/>
                </div>
                <CardSummaryTransaction type="order" valueCurrent={992} valueBack={764} />
              </div>
            </div>
            <div className={style.contentTable}>
              <h3>Transaçoes </h3>
              <div className={style.containerTable}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope="col" className='thId'>#</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Valor</th>
                    </tr>
                  </thead>
                    <tbody>
                      {
                        transactions.map(x => {
                          return (
                            <tr key={x.id}>
                              <th scope="row" className='thId'>{x.id}</th>
                              <th scope="row">{x.category}</th>
                              <th scope="row"><Tag  text={x.type} /></th>
                              <th scope="row">{x.total_value}</th>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                </table>
                {
                  transactions.length === 0 && (
                    <div className='contentEmpty'>
                      <span>nem uma transação foi efetuado hoje</span>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}