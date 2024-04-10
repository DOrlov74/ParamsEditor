import React from "react";

interface Param {
  id: number;
  name: string;
  type: string;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramName: Param;
  paramValue: ParamValue[];
}
interface Props {}

interface State {
  model: Model[];
}

const params = [
  {
    id: 1,
    name: "Назначение",
  },
  {
    id: 2,
    name: "Длина",
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

export default class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      model: [],
    };
  }
  public getModel(): Model[] {
    const result = [] as Model[];
    params.map((param) => {
      const name = { ...param, type: "string" };
      const values = model.paramValues.filter(
        (paramValue) => paramValue.paramId === param.id
      );

      result.push({ paramName: name, paramValue: values });
    });
    this.setState({ model: result });

    return result;
  }

  componentDidMount() {
    this.getModel();
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.value;
    const id = target.id;
    const param = this.state.model.find(
      (param) => param.paramName.id.toString() === id
    );
    if (param) {
      const values = value.split("\n");
      const index = this.state.model.indexOf(param);
      const model = this.state.model;
      const valuesObj = values.map((v) => {
        return { paramId: parseInt(id), value: v };
      });
      model[index].paramValue = valuesObj;
      this.setState({ model: model });
    }
  };

  public render() {
    return (
      <>
        {this.state.model.map((param) => (
          <div key={param.paramName.id}>
            <label
              htmlFor={param.paramName.id.toString()}
              style={{ padding: "10px" }}
            >
              {param.paramName.name}
            </label>
            <textarea
              style={{ padding: "10px" }}
              id={param.paramName.id.toString()}
              value={param.paramValue.map((val, index) =>
                index < param.paramValue.length - 1
                  ? val.value + "\n"
                  : val.value
              )}
              onChange={this.handleChange}
            />
          </div>
        ))}
      </>
    );
  }
}
