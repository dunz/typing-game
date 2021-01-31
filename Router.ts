export class Router {
    private readonly defaultPath = 'play';
    private readonly pages: Array<any>;
    private readonly app: Element;
    private page: any;
    private path: string;

    constructor(pages: Array<any>) {
        this.app = document.getElementById('app');
        this.pages = pages;
        this.changePage();

        window.addEventListener('hashchange', this.changePage.bind(this));
    }

    changePage(): void {
        this.path = window.location.hash.replace('#', '') || this.defaultPath;
        const page = this.pages.find(page => page.path === this.path);
        const Page = page.page;

        this.page = new Page();
        this.app.innerHTML = this.page.render();
        this.page.mount();
    }
}