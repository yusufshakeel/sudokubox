export default class StackHelper {
  private stack: any = [];

  public raw() {
    return [...this.stack];
  }

  public push(data: any) {
    return this.stack.push(data);
  }

  public pop() {
    return this.stack.pop();
  }

  public peek() {
    return this.stack[this.size() - 1];
  }

  public size() {
    return this.stack.length;
  }
}