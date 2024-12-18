import {Component, OnInit} from '@angular/core';
import {ChatFolder, Message} from '../interface/message';

import "@ui5/webcomponents/dist/Button.js";

import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";

import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/menu.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/paper-plane.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/source-code.js";
import "@ui5/webcomponents-icons/dist/background.js";
import "@ui5/webcomponents-icons/dist/activity-assigned-to-goal.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/chain-link.js";
import "@ui5/webcomponents/dist/TextArea.js";
import "@ui5/webcomponents/dist/Button.js";
import "../services/api-service.service"
import {ApiServiceService} from '../services/api-service.service';

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrl: './input-message.component.css'
})
export class InputMessageComponent implements OnInit {
  isCollapsed = false;
  isLink: boolean = false
  chatFolders: ChatFolder[] = [
    { name: 'New chat', messages: [] },
  ];

  currentFolderIndex: number = 0; // Индекс текущей открытой папки
  messageInput: string = ''; // Входные данные для сообщения
  isTyping: boolean = false; // Показатель того, печатает ли сервер
  isEditing: boolean = false;
  editIndex: number | null = null;

  constructor (private apiService: ApiServiceService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.messageInput.trim()) {
      if (this.isEditing && this.editIndex !== null) {
        this.chatFolders[this.currentFolderIndex].messages[this.editIndex].text = this.messageInput;
        this.isEditing = false;
        this.editIndex = null;
      } else {
        this.chatFolders[this.currentFolderIndex].messages.unshift({
          text: this.messageInput,
          type: 'sent',
          isLink: this.isLink,
        });
      }

      this.isTyping = true;

      this.apiService.sendRequest(this.messageInput).subscribe(
        response => {
          const answer = response.answer;

          let message: Message = {
            text: '',      // Начальное значение
            type: 'received',  // Тип по умолчанию, например, 'received'
            isLink: false,     // Флаг по умолчанию
          };
          if (typeof answer === 'string') {
            const isLink = /^https?:\/\//.test(answer);

            if (isLink) {
              message = {
                text: answer,
                type: 'received',
                isLink: true,
              };
            } else {
              message = {
                text: answer,
                type: 'received',
                isLink: false,
              };
            }
          }

          this.chatFolders[this.currentFolderIndex].messages.unshift(message);
          this.isTyping = false;
          this.messageInput = '';
        },
        error => {
          console.error('Error:', error);
          this.isTyping = false;
        }
      );
    }
  }

editMessage(index: number) {
    this.messageInput = this.chatFolders[this.currentFolderIndex].messages[index].text;
    this.isEditing = true;
    this.editIndex = index;
}

  openFolder(index: number) {
    this.currentFolderIndex = index; // Установить текущую папку
  }

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  createNewChatFolder() {
    const newFolderName = `New chat ${this.chatFolders.length + 1}`; // Имя новой папки
    this.chatFolders.push({ name: newFolderName, messages: [] }); // Добавить новую папку
    this.currentFolderIndex = this.chatFolders.length - 1; // Установить новую папку как текущую
  }

}
