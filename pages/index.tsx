import React, { useState } from 'react'
import { NextPage } from 'next'
import { Form, Input } from 'antd'
import { useMoralis } from 'react-moralis'
import styled from 'styled-components'
import Wallet from '../components/Wallet'

const { Search } = Input

const Home: NextPage = () => {
  const [form] = Form.useForm()
  const [address, setAddress] = useState<string>('')
  const { Moralis } = useMoralis()

  return (
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
              validator(_, value: string) {
                if (Moralis.web3Library.utils.isAddress(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Invalid wallet address'))
              },
            },
          ]}
        >
          <Search
            allowClear
            onSearch={(value: string) => {
              setAddress(value)
            }}
            style={{ minWidth: '400px' }}
          />
        </Form.Item>
      </div>
      {address ? <Wallet address={address} /> : ''}
    </StyledForm>
  )
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: left;
`

export default Home
