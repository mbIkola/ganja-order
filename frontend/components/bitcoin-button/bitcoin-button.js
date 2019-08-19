import React from "react";
import {Input} from "../form/input";
import {Submit} from "../form/submit";
import {Checkbox} from "@blueprintjs/core";
import {Form} from "formik";
import Link from "next/link";
import {domain} from "../../settings";

export class BitcoinPaymentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            confirm: false
        };
    }

    handleInput = e => {
        this.setState({ email: e.target.value });
    };

    handleCheckbox = e => {
        this.setState({ confirm: e.target.checked });
    };

    render() {
        const disabled =
            this.state.email !== "" &&
            this.state.confirm &&
            this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                ? false
                : true;

        return (
            <div style={{ padding: "15px" }}>
                <Form
                    method="POST"
                    action="https://testnet.demo.btcpayserver.org/apps/37NLaNoSEjz6J39eHUKMdgKYz7gv/pos"
                >
                    <Input
                        placeholder="Please input your email"
                        onChange={this.handleInput}
                        required={false}
                        onBlur={/*() =>
                            !this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                                ? message.warning("Email is not valid")
                                : null
                        */ () => {}}
                        name={"email"}
                    />
                    <Checkbox required onChange={this.handleCheckbox}>
                        I accept your <Link href="/tos"><a>terms of service</a></Link> and <Link href="/privacy"><a>privacy policy</a></Link>.
                    </Checkbox>
                    <input type="hidden" name="email" value={this.state.email} />
                    <input type="hidden" name="orderId" value="CustomSockShopId" />
                    <input
                        type="hidden"
                        name="redirectUrl"
                        value={`${window.location.protocol}/${domain}/order?orderId=${this.state.orderId || 'CustomSockShopId'}`}
                    />
                    <Submit
                        disabled={disabled}
                        value={this.props.coin}
                        htmlType="submit"
                        name="choiceKey"
                    >
                        {`To Payment ($${this.props.amount})`}
                    </Submit>
                </Form>
            </div>
        );
    }
}
export default BitcoinPaymentBox;
