import { Component, Injectable, OnInit } from '@angular/core';
import { TimeService } from './time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  timeEntries: TimeEntry[] = [];
  selectedTasks: string[] = [];
  newTask: string = '';
  tasks: string[] = [];
  sugestionTasks: string[] = ['daily', 'retro', 'planning', 'review'];

  constructor(private timeService: TimeService) {}

  async ngOnInit(): Promise<void> {
    await this.timeService.getAllTime();
  }

  async post() {
    const now = new Date();
    const day = this.formatDate(now);
    let newTimes = {
      [day]: {
        'time': this.timeEntries,
        'tasks': this.tasks
      }
    };
    console.log('TIME :>> ', newTimes);
    // await this.timeService.postAddProducts(this.timeEntries);
  }

  toggleTimeEntry() {
    const now = new Date();
    const entryType = this.timeEntries.length % 2 === 0 ? 'Entrada' : 'Saída';

    this.timeEntries.push({
      date: this.formatDate(now),
      time: this.formatTime(now),
      type: entryType,
      // tasks: this.selectedTasks.slice() // Clonando o array
    });
    this.selectedTasks = []; // Limpar tarefas selecionadas
  }

  addNewTask(task?: string) {
    if (task && !this.tasks.includes(task)) {
      this.tasks.push(task);
      this.selectedTasks.push(task);
      this.sugestionTasks = this.sugestionTasks.filter(i => i !== task);
      this.newTask = '';
    } else {
      if (this.newTask && !this.tasks.includes(this.newTask)) {
        this.tasks.push(this.newTask);
        this.selectedTasks.push(this.newTask);
        this.newTask = '';
      }
    }
  }

  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}`;
  }

  private formatTime(date: Date): string {
    return `${this.padNumber(date.getHours())}:${this.padNumber(date.getMinutes())}:${this.padNumber(date.getSeconds())}`;
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  formatDateString(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1; // Os meses são base 0
    const year = date.getFullYear();

    return `${this.padZero(day)}/${this.padZero(month)}/${year}`;
  }

  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}

interface TimeEntry {
  date: string;
  time: string;
  type: string;
  // tasks: string[];
}
