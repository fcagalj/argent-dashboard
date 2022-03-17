import React, { useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import { Form, Input, Table, Statistic, Skeleton } from 'antd'

import { LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Search } = Input

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const account = {
    publicKey: '0x592859824C9D8A97e0f61B22765fE1302fF3Bb60',
  }
  const balance = 3.14

  const assets = [
    {
      token_address: '0xd3ace836e47f7cf4948dffd8ca2937494c52580c',
      name: 'Free BOB Tokens - BobsRepair.com',
      symbol: 'BOBx',
      logo: null,
      thumbnail: null,
      decimals: '18',
      balance: '1500000000000000000000',
    },
    {
      token_address: '0xf3e014fe81267870624132ef3a646b8e83853a96',
      name: 'VIN',
      symbol: 'VIN',
      logo: null,
      thumbnail: null,
      decimals: '18',
      balance: '7770000000000000000',
    },
    {
      token_address: '0xba4cfe5741b357fa371b506e5db0774abfecf8fc',
      name: 'vVSP pool',
      symbol: 'vVSP',
      logo: 'https://cdn.moralis.io/eth/0xba4cfe5741b357fa371b506e5db0774abfecf8fc.png',
      thumbnail: 'https://cdn.moralis.io/eth/0xba4cfe5741b357fa371b506e5db0774abfecf8fc_thumb.png',
      decimals: '18',
      balance: '1',
    },
    {
      token_address: '0xbddab785b306bcd9fb056da189615cc8ece1d823',
      name: 'Ebakus',
      symbol: 'EBK',
      logo: null,
      thumbnail: null,
      decimals: '18',
      balance: '7224920380495147898',
    },
  ]

  const fromWei = (value: string, decimals: string): string => {
    return `${value} ${decimals}`
  }

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
      render: (value: string, item: { decimals: any }) => parseFloat(fromWei(value, item.decimals)).toFixed(6),
    },
  ]

  const onSearch = (value: string) => console.log(value)
  const isValidAddress = (value: string | null): boolean => {
    return true
  }

  const displayAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <>
      <StyledForm form={form} layout="vertical" autoComplete="off" requiredMark={false} colon={true}>
        <div style={{ overflow: 'hidden', margin: '2rem 0' }}>
          <Form.Item
            name="search"
            label="Enter your wallet address"
            rules={[
              {
                message: 'Enter valid wallet address',
              },
              {
                validator(_, value) {
                  if (isValidAddress(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Invalid wallet address'))
                },
              },
            ]}
          >
            <Search allowClear onSearch={onSearch} style={{ minWidth: '400px' }} />
          </Form.Item>
        </div>
        {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
        {!loading && account && (
          <>
            <Statistic
              style={{ marginTop: '2rem' }}
              title="Account"
              value={displayAddress(account.publicKey.toString())}
            />
            <Statistic style={{ marginTop: '2rem' }} title="Wallet balance" value={`${balance} ETH`} />
            <Statistic style={{ marginTop: '2rem' }} title="Number of guardians" value={`2`} />
            <Skeleton loading={!assets}>
              <Table
                style={{ margin: '2rem 0' }}
                dataSource={assets}
                columns={columns}
                rowKey={record => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  return record.token_address
                }}
              />
            </Skeleton>
          </>
        )}
      </StyledForm>
    </>
  )
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: left;
`

export default Home
