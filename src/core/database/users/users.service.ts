import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { UserDto } from './user-dto';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';
import { TransactionDto } from '../transactions/transaction-dto';
@Injectable({
    providedIn: 'root',
})
export class UsersService {
    usersRef: AngularFirestoreCollection<UserDto> = null;
    private dbPath = '/users';

    constructor(
        private db: AngularFirestore,
        private firestore: Firestore,
    ) {
        this.usersRef = db.collection(this.dbPath);
    }

    async getAll(): Promise<UserDto[]> {
        const users: UserDto[] = [];
        const querySnapshot = await getDocs(collection(this.firestore, 'users'));
        querySnapshot.forEach((document) => {
            users.push(document.data as unknown as UserDto);
        });
        return users;
    }

    async findOne(uid: string): Promise<UserDto> {
        let getUser = new UserDto();
        const docRef = doc(this.firestore, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            getUser = docSnap.data() as UserDto;
        } else {
            getUser = null;
        }
        return getUser;
    }

    async getCurrentUser(): Promise<UserDto> {
        let currentUser = new UserDto();
        const auth = await getAuth();
        currentUser = await this.findOne(auth.currentUser.uid);
        return currentUser;
    }

    async create(userDto: UserDto): Promise<void> {
        return await setDoc(doc(this.firestore, 'users', userDto.uid), Object.assign({}, userDto));
    }

    async delete(id: string): Promise<void> {
        return await this.usersRef.doc(id).delete();
    }

    async addTransactionOnUser(userDto: UserDto, transaction: TransactionDto): Promise<void> {
        if (!userDto.transactions) {
            userDto.transactions = [];
        }
        userDto.solde = userDto.solde + transaction.value;
        transaction.id = this.db.createId();
        userDto.transactions.push(Object.assign({}, transaction));
        return await this.create(userDto);
    }

    async removeTransactionOnUser(userDto: UserDto, transaction: TransactionDto): Promise<void> {
        const index = userDto.transactions.findIndex(x => x.id === transaction.id);
        if (index === -1) {
            return;
        }
        userDto.transactions.splice(index, 1);
        await this.create(userDto);
    }
}
