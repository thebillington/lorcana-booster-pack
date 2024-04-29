export class Homepage {
    public clickHomeButton = () => {
        alert("clicked!");
    }
}

(window as any).homepage = new Homepage();