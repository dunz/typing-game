import {Word} from '../types/types';
import store from '../store';

export class PlayPage {
    private wordsApiUrl: string = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
    private words: Array<Word>;
    private passSeconds: Array<number> = [];
    private score: number;
    private remainSecond: number;
    private wordTimer: any;
    private remainEl: HTMLSpanElement;
    private scoreEl: HTMLSpanElement;
    private wordEl: HTMLSpanElement;
    private startButtonEl: HTMLButtonElement;
    private inputBoxEl: HTMLInputElement;

    constructor() {
        store.init();
    }

    private get activeWord(): Word {
        return this.words[0];
    }

    private get isFinish(): boolean {
        return !this.activeWord;
    }

    private get activeSolveTime(): number {
        return this.activeWord.second - this.remainSecond;
    }

    private async fetchWords(): Promise<any> {
        const result = await fetch(this.wordsApiUrl);
        return result.json();
    }

    public async start(): Promise<any> {
        this.words = await this.fetchWords();
        this.inputBoxEl.focus();

        this.setWordTimer();
        this.score = this.words.length;
        this.renderScore();
    }

    private clickStartButton(event: Event): void {
        this.start();
    }

    private keydownInputBox(event: KeyboardEvent): void {
        if (event.key !== 'Enter') return;

        this.inputBoxEl.value === this.activeWord.text && this.pass();
    }

    public calculateTotalReport(): void {
        if (!this.isFinish) return;

        const sum = this.passSeconds.reduce((sum: number, second: number) => sum + second, 0);
        store.totalReport.averageSecond = Math.round(sum / this.passSeconds.length);
        store.totalReport.score = this.score;
    }

    private setWordTimer(): void {
        if (this.isFinish) {
            return clearInterval(this.wordTimer);
        }
        this.remainSecond = this.activeWord.second;
        this.wordTimer && clearInterval(this.wordTimer);
        this.wordTimer = setInterval(() => {
            this.remainSecond--;
            this.renderTime();
            this.renderWord();
            if (this.remainSecond === 0) this.over();
        }, 1000);
        this.renderTime();
        this.renderWord();
    }

    private next() {
        this.inputBoxEl.value = '';
        this.words.shift();
        this.setWordTimer();
    }

    private pass() {
        this.passSeconds.push(this.activeSolveTime);
        this.next();
        if (this.isFinish) {
            this.calculateTotalReport();
            window.location.hash = 'report';
        }
    }

    private over(): void {
        this.score--;
        this.next();
        if (this.isFinish) {
            this.calculateTotalReport();
            window.location.hash = 'report';
        }
    }

    private renderTime(): void {
        this.remainEl.textContent = this.remainSecond.toString();
    }

    private renderWord(): void {
        this.wordEl.textContent = this.activeWord.text.toString();
    }

    private renderScore(): void {
        this.scoreEl.textContent = this.score.toString();
    }

    public mount(): void {
        this.remainEl ||= document.getElementById('remain') as HTMLSpanElement;
        this.scoreEl ||= document.getElementById('score') as HTMLSpanElement;
        this.wordEl ||= document.getElementById('word') as HTMLSpanElement;
        this.inputBoxEl ||= document.getElementById('inputBox') as HTMLInputElement;
        this.startButtonEl ||= document.getElementById('startButton') as HTMLButtonElement;

        this.inputBoxEl.addEventListener('keydown', this.keydownInputBox.bind(this));
        this.startButtonEl.addEventListener('click', this.clickStartButton.bind(this));
    }

    public render(): string {
        return `
            <header>
                <article>남은 시간 : <span id="remain"></span></article>
                <article>점수 : <span id="score"></span></article>
            </header>
            <section class="problem">
                <span class="word" id="word"></span>
                <input type="text" class="input-box" id="inputBox" placeholder="입력" />
                <button id="startButton">시작</button>
            </section>
        `;
    }
}