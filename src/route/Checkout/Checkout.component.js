import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import "./Checkout.override.style.scss";
import ContentWrapper from "Component/ContentWrapper";
import CheckoutProgressBar from "Component/CheckoutProgressBar";

/** @namespace Component/Checkout/Component */

export class Checkout extends SourceCheckout {
  render() {
    return (
      <main block="Checkout">
        <CheckoutProgressBar
          step={this.props.checkoutStep}
          totalSteps={Object.keys(this.stepMap).length}
          allStepsNames={this.stepMap}
        />
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default Checkout;
