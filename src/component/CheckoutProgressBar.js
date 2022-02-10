import { PureComponent } from "react";
import "./CheckoutProgressBar.style.scss";

export class CheckoutProgressBar extends PureComponent {
  state = {
    completedSteps: 0,
    completedStepsNames: [],
    currentStep: this.props.step,
    stepsObjects: [],
  };

  render() {
    return (
      <div className="progress-bar-wrapper">
        <div className="progress-bar-all">
          <div
            style={{
              width: `${
                (this.state.completedSteps / this.state.stepsObjects.length) *
                100
              }%`,
            }}
            className="progress-bar-filled"
          ></div>
        </div>
        {this.state.stepsObjects.map((stepObject) => {
          const offset =
            (100 / this.state.stepsObjects.length) * stepObject.order;
          if (stepObject.order === this.state.stepsObjects.length) {
            return;
          }
          return (
            <div
              key={stepObject.order}
              className="steps-div"
              style={{
                left: `${
                  (stepObject.order / this.state.stepsObjects.length) * 100
                }%`,
              }}
            >
              {stepObject.order <= this.state.completedSteps ? (
                <div className="order-wrapper">
                  <p className="step-completed">
                    {String.fromCharCode(0x2713)}
                  </p>{" "}
                </div>
              ) : (
                <div className="order-wrapper">
                  {" "}
                  <p className="next-steps">{stepObject.order}</p>{" "}
                </div>
              )}
              {
                <p
                  className={
                    stepObject.order <= this.state.completedSteps
                      ? "completed-steps-names"
                      : "next-steps-names"
                  }
                >
                  {stepObject.stepName}
                </p>
              }
            </div>
          );
        })}
      </div>
    );
  }

  getSnapshotBeforeUpdate(prevProps) {
    return (this.prevStep = prevProps.step);
  }

  componentDidMount() {
    const getStepsOrder = () => {
      const keys = Object.keys(this.props.allStepsNames);
      const stepsHolder = [];
      keys.forEach((key, index) => {
        stepsHolder.push({
          stepName: this.props.allStepsNames[`${key}`].title,
          order: index + 1,
        });
      });
      this.setState({ stepsObjects: [...stepsHolder] });
    };
    getStepsOrder();
  }
  componentDidUpdate() {
    if (this.prevStep === this.props.step) {
      return null;
    }

    return this.setState({
      completedSteps: this.state.completedSteps + 1,
      completedStepsNames: [...this.state.completedStepsNames, this.prevStep],
    });
  }
}

export default CheckoutProgressBar;
