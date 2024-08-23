import {Component} from 'react'

import Loader from 'react-loader-spinner'

import CryptocurrenciesList from '../CryptocurrenciesList'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/crypto-currency-converter'

class CryptocurrencyTracker extends Component {
  state = {
    cryptocurrenciesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getCryptocurrencies()
  }

  getCryptocurrencies = async () => {
    const response = await fetch(apiUrl)
    const fetchData = await response.json()
    console.log(fetchData)

    this.setState({
      cryptocurrenciesData: fetchData.map(eachCryptoCurrency => ({
        id: eachCryptoCurrency.id,
        currencyLogoUrl: eachCryptoCurrency.currency_logo,
        currencyName: eachCryptoCurrency.currency_name,
        usdValue: eachCryptoCurrency.usd_value,
        euroValue: eachCryptoCurrency.euro_value,
      })),
      isLoading: false,
    })
  }

  renderCryptoCurrenciesList = () => {
    const {cryptocurrenciesData} = this.state
    return <CryptocurrenciesList cryptocurrenciesData={cryptocurrenciesData} />
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Rings" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        {isLoading ? this.renderLoader() : this.renderCryptoCurrenciesList()}
      </div>
    )
  }
}

export default CryptocurrencyTracker
