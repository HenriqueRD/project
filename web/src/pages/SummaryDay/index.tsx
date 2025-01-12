import { FormEvent, useEffect, useState } from "react";
import CardSummaryTransaction from "../../components/CardSummaryTransaction";
import Header from "../../components/Header";
import qs from 'qs'
import style from './styles.module.css'
import { api } from "../../api";
import { MethodPaymentSellProps, MethodPaymentTransactionProps, TransactionsProps, TypeTransactionProps } from "../../types";
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
  const [ methodPayment, setMethodPayment ] = useState<MethodPaymentTransactionProps | "ALL">()
  const [ type, setType ] = useState<TypeTransactionProps>()

  const totalInputs = transactions.filter(x => x.type === "ENTRADA").reduce((acc, itr) =>  acc + itr.totalValue, 0)
  const totalOutputs = transactions.filter(x => x.type === "SAIDA").reduce((acc, itr) =>  acc + itr.totalValue, 0)
  
  async function getTransactions(type? : string, methodPayment? : string) {
    setIsLoading(true)
    await api.get("/transactions/", { params: {
      date: format(new Date(), 'yyyy-MM-dd'),
      type: !type ? ["SAIDA", "ENTRADA"] : type, 
      payment: !methodPayment ? ["DINHEIRO", "PIX", "BOLETO", "DEBITO", "CREDITO"] : methodPayment
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }})
    .then((x) => setTrasactions(x.data))
    .catch(() => toast.error("Falha ao carregar as transações"))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getTransactions()
  }, [])

  function filterTransactionsByMethodPayment(type : MethodPaymentSellProps) {
    return transactions.filter(x => x.type === "ENTRADA").filter(x => x.methodPayment === type).reduce((acc, itr) => acc + itr.totalValue, 0)
  }

  async function handleFilterList(event : FormEvent) {
    event.preventDefault()
    await getTransactions(!type ? "" : type, !methodPayment ? "" : methodPayment)
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
                  <CardSummaryTransaction type="input" valueCurrent={totalInputs} />
                  <CardSummaryTransaction type="output" valueCurrent={totalOutputs} />
                  <CardSummaryTransaction type="total" valueCurrent={totalInputs - totalOutputs} />
                </div>
                <CardSummaryTransaction type="transactions" valueCurrent={transactions.length}  />
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
                <h3>Extrato Transações</h3>
                <form onSubmit={handleFilterList} className={style.tableHeaderTransactionsForm}>
                  <select value={methodPayment} onChange={(x) => setMethodPayment(x.target.value as MethodPaymentTransactionProps)}>
                    <option value="">Todos pagamento</option>
                    <option value="DINHEIRO">Dinheiro</option>
                    <option value="CREDITO">Crédito</option>
                    <option value="DEBITO">Débito</option>
                    <option value="PIX">Pix</option>
                    <option value="BOLETO">Boleto</option>
                  </select>
                  <select value={type} onChange={(x) => setType(x.target.value as TypeTransactionProps)}>
                    <option value="">Todos tipos</option>
                    <option value="SAIDA">Saídas</option>
                    <option value="ENTRADA">Entradas</option>
                  </select>
                  <Button type="submit" variant="primary" icon><MagnifyingGlass size={20}/></Button>
                </form>
              </div>
              <div className={style.containerTable}>
                <table className='table'>
                  <thead>
                    <tr>
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