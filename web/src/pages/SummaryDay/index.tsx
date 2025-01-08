import { useEffect, useState } from "react";
import CardSummaryTransaction from "../../components/CardSummaryTransaction";
import Header from "../../components/Header";
import style from './styles.module.css'
import { api } from "../../api";
import { MethodPaymentPros, TransactionsProps } from "../../types";
import Tag from "../../components/Tag";
import { format, formatDistance, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import CardSummaryMethodPayment from "../../components/CardSummaryMethodPayment";
import Button from "../../components/Button";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SummaryDay() {
  const [ transactions, setTrasactions ] = useState<TransactionsProps[]>([] as any)
  const [ isLoading, setIsLoading ] = useState(false)

  const totalInputs = transactions.filter(x => x.type === "ENTRADA").reduce((acc, itr) =>  acc + itr.totalValue, 0)
  const totalOutputs = transactions.filter(x => x.type === "SAIDA").reduce((acc, itr) =>  acc + itr.totalValue, 0)
  
  async function getTransactions() {
    setIsLoading(true)
    await api.get("/transactions/", { params: { date: format(new Date(), 'yyyy-MM-dd') }})
    .then((x) => setTrasactions(x.data))
    .catch(() => toast.error("Falha ao carregar as transações"))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getTransactions()
  }, [])

  function filterTransactionsByMethodPayment(type : MethodPaymentPros) {
    return transactions.filter(x => x.type === "ENTRADA").filter(x => x.methodPayment === type).reduce((acc, itr) => acc + itr.totalValue, 0)
  }

  return (
    <>
      <Header />
      <main id={style.summaryDay}>
        <div className="container">
          <div className="content">
            <div className={style.summaryTransactionInfo}>
              <div className={style.summaryTransactionInfoHeader}>
                <h3>Resumo do dia</h3>
                <p>Abaixo o resumo das transações realizadas no dia de hoje</p>
              </div>
              <div className={style.cards}>
                <div className={style.treeTransa}>
                  <CardSummaryTransaction type="input" valueCurrent={totalInputs} valueBack={1} />
                  <CardSummaryTransaction type="output" valueCurrent={totalOutputs} valueBack={1} />
                  <CardSummaryTransaction type="total" valueCurrent={totalInputs - totalOutputs} />
                </div>
                <CardSummaryTransaction type="transactions" valueCurrent={transactions.length} valueBack={1} />
              </div>
            </div>
            <div className={style.summaryInputsInfo}>
              <p>Métodos de pagamento utilizados nas transações de receitas</p>
              <div className={style.cardsInputs}>
                <CardSummaryMethodPayment type="money" valueCurrent={filterTransactionsByMethodPayment("DINHEIRO")} />                
                <CardSummaryMethodPayment type="pix" valueCurrent={filterTransactionsByMethodPayment("PIX")} />
                <CardSummaryMethodPayment type="credit" valueCurrent={filterTransactionsByMethodPayment("CREDITO")} />
                <CardSummaryMethodPayment type="debit" valueCurrent={filterTransactionsByMethodPayment("DEBITO")} />
              </div>
            </div>
            <div className={style.contentTable}>
              <div className={style.tableHeaderTransactions}>
                <h3>Transações</h3>
                <div className={style.buttonsHeader}>
                  <select>
                    <option value="ALL">Todos</option>
                    <option value="INPUT">Entradas</option>
                    <option value="OUTPUT">Saídas</option>
                  </select>
                  <Button icon><MagnifyingGlass size={20}/></Button>
                </div>
              </div>
              <div className={style.containerTable}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope="col" className='thId'>#</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Pagamento</th>
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
                            <td scope="row" className={style.categoryTable}>{x.methodPayment}</td>
                            <td scope="row">{x.totalValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                            <td scope="row"><time title={format(x.createdAt, 'dd/MM/yyyy')} dateTime={x.createdAt.toString()}>{formatDistance(subDays(x.createdAt, 0), new Date(), {addSuffix: false, locale: ptBR})}</time></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                {
                  isLoading ? (
                    <div className="contentEmpty">
                      <TailSpin
                        visible={true}
                        height="66"
                        width="66"
                        color="#0a58ca"
                        ariaLabel="tail-spin-loading" 
                      />
                    </div>
                  ) : (
                    transactions.length === 0 && (
                      <div className='contentEmpty'>
                        <span>nem uma transação foi efetuado hoje</span>
                      </div>
                    )
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