import { useEffect, useState } from "react";
import CardSummaryTransaction from "../../components/CardSummaryTransaction";
import Header from "../../components/Header";
import style from './styles.module.css'
import { api } from "../../api";
import { TransactionsProps } from "../../types";
import Tag from "../../components/Tag";
import { format, formatDistance, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function SummaryDay() {
  const [ transactions, setTrasactions ] = useState<TransactionsProps[]>([] as any)

  async function getTransactions() {
    await api.get("/transactions/", { params: { date: new Date().toISOString().split("T")[0] } }).then((x) => setTrasactions(x.data)).then(() => console.log(transactions))
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
                <CardSummaryTransaction type="transactions" valueCurrent={992} valueBack={764} />
              </div>
            </div>
            <div className={style.contentTable}>
              <h3>Transações</h3>
              <div className={style.containerTable}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope="col" className='thId'>#</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Criado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      transactions.map(x => {
                        return (
                          <tr key={x.id}>
                            <th scope="row" className='thId'>{x.id}</th>
                            <td scope="row"><Tag  text={x.type}/></td>
                            <td scope="row" className={style.categoryTable}>{x.category}</td>
                            <td scope="row">{x.total_value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                            <td scope="row"><time title={format(x.created_at, 'dd/MM/yyyy')} dateTime={x.created_at.toString()}>{formatDistance(subDays(x.created_at, 0), new Date(), {addSuffix: false, locale: ptBR})}</time></td>
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