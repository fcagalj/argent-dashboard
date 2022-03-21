import React, { ReactElement } from 'react'
import Image from 'next/image'
import { useBalance, useContractRead } from 'wagmi'
import { useMoralis, useERC20Balances } from 'react-moralis'
import { Table, Statistic, Skeleton } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import GuardianManagerAbi from '../../abi/GuardianManager.json'

const ARGENT_GUARDIAN_MANAGER = '0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7'

const displayAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

const round = (formattedNum: string, decimals: number) => {
  return (
    Math.round(parseFloat((Number(formattedNum) * Math.pow(10, decimals)).toFixed(decimals))) / Math.pow(10, decimals)
  )
}

const Wallet = ({ address }: { address: string }): ReactElement => {
  const { Moralis } = useMoralis()
  const [{ data, loading: isLoadingBalance }] = useBalance({
    addressOrName: address,
  })

  const { data: assets, isLoading: isLoadingErc20Balances } = useERC20Balances({ address }, { autoFetch: true })

  const [{ data: argentData, loading: isReadingArgent }] = useContractRead(
    {
      addressOrName: ARGENT_GUARDIAN_MANAGER,
      contractInterface: GuardianManagerAbi,
    },
    'guardianCount',
    {
      args: address,
    },
  )

  const columns = [
    {
      title: '',
      dataIndex: 'logo',
      key: 'logo',
      render: (logo: string) => (
        <Image src={logo || '/images/empty-token.png'} alt="nologo" width="28px" height="28px" />
      ),
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (symbol: string) => symbol,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (value: string, item: { decimals: string; token_address: string }) => {
        return round(Moralis.Units.FromWei(value, Number(item.decimals)), 2)
      },
    },
  ]

  return (
    <>
      {address && <Statistic style={{ marginTop: '2rem' }} title="Account" value={displayAddress(address)} />}
      {!isLoadingBalance && data?.formatted ? (
        <Statistic style={{ marginTop: '2rem' }} title="Wallet balance" value={`${round(data?.formatted, 4)} ETH`} />
      ) : (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      )}
      {!isReadingArgent && argentData ? (
        <Statistic style={{ marginTop: '2rem' }} title="Number of guardians" value={argentData.toString()} />
      ) : (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      )}

      <Skeleton loading={isLoadingErc20Balances || !assets}>
        <Table
          style={{ margin: '2rem 0' }}
          dataSource={assets}
          columns={columns}
          rowKey={({ token_address }: { token_address: string }) => {
            return token_address
          }}
        />
      </Skeleton>
    </>
  )
}

export default Wallet
