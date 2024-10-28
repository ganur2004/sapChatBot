import { Component } from '@angular/core';
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

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrl: './input-message.component.css'
})
export class InputMessageComponent {
  isCollapsed = false;
  chatFolders: ChatFolder[] = [
    { name: 'New chat', messages: [] },
  ];
  
  currentFolderIndex: number = 0; // Индекс текущей открытой папки
  messageInput: string = ''; // Входные данные для сообщения
  isTyping: boolean = false; // Показатель того, печатает ли сервер
  isEditing: boolean = false;
  editIndex: number | null = null;

  sendMessage() {
    if (this.messageInput.trim()) {
        if (this.isEditing) {
            // Если мы редактируем, обновляем сообщение
            this.chatFolders[this.currentFolderIndex].messages[this.editIndex!].text = this.messageInput;
            this.isEditing = false; // Выходим из режима редактирования
            this.editIndex = null; // Сбрасываем индекс редактируемого сообщения
        } else {
            // Добавляем новое сообщение
            this.chatFolders[this.currentFolderIndex].messages.unshift({
                text: this.messageInput,
                type: 'sent'
            });
        }

        // Устанавливаем индикатор "печати"
        this.isTyping = true;

        // Имитация задержки сервера
        setTimeout(() => {
            // Ответ сервера — это то же сообщение
            this.chatFolders[this.currentFolderIndex].messages.unshift({
                text: this.messageInput, // Можно заменить на другой текст, если нужно
                type: 'received'
            });

            // Скрываем индикатор "печати"
            this.isTyping = false;
            this.messageInput = ''; // Очищаем поле ввода
        }, 2000); // 2 секунды задержки
    }
}

editMessage(index: number) {
    this.messageInput = this.chatFolders[this.currentFolderIndex].messages[index].text; // Устанавливаем текст сообщения в поле ввода
    this.isEditing = true; // Входим в режим редактирования
    this.editIndex = index; // Запоминаем индекс редактируемого сообщения
}


  sendMessage1() {
    if (this.messageInput.trim()) {
      this.chatFolders[this.currentFolderIndex].messages.unshift({
        text: this.messageInput,
        type: 'sent'
      });
      
      // Установить индикатор "печати" в true
      this.isTyping = true;

      // Имитация задержки сервера
      setTimeout(() => {
        // После задержки добавляем ответ
        this.chatFolders[this.currentFolderIndex].messages.unshift({
          text: this.messageInput, // Ответ - это то же самое сообщение
          type: 'received'
        });
        
        // Скрыть индикатор "печати"
        this.isTyping = false;
        this.messageInput = ''; // Сбросить ввод после отправки
      }, 2000); // 2 секунды задержки
    }
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
