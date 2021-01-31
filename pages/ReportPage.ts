import store from '../store';

export class ReportPage {
    private restartButtonEl: HTMLButtonElement;
    private scoreEl: HTMLSpanElement;
    private averageSecondEl: HTMLSpanElement;

    public mount() {
        this.scoreEl ||= document.getElementById('score') as HTMLSpanElement;
        this.averageSecondEl ||= document.getElementById('averageSecond') as HTMLSpanElement;
        this.restartButtonEl ||= document.getElementById('restart') as HTMLButtonElement;

        this.restartButtonEl.addEventListener('click', () => {
            window.location.hash = 'play';
        });
        this.scoreEl.textContent = store.totalReport.score.toString();
        this.averageSecondEl.textContent = store.totalReport.averageSecond.toString();
    }

    public render() {
        return `
            <section class="report">
                <strong>Mission Complete!</strong>
                <p class="desc">당신의 점수는 <span id="score">10</span>점입니다.</p>
                <p>단어당 평균 답변 시간은 <span id="averageSecond">4</span>초입니다.</p>
                <button id="restart">다시 시작</button>            
            </section>
        `;
    }
}