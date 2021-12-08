import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UserDto } from './user-dto';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { user } from 'rxfire/auth';
import { getAuth } from '@angular/fire/auth';
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
        querySnapshot.forEach((doc) => {
            users.push(doc.data as unknown as UserDto);
        });
        return users;
    }

    async findOne(uid: string): Promise<UserDto> {
        let getUser = new UserDto();
        const q = query(collection(this.firestore, 'users'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            getUser = doc.data() as UserDto;
        });
        return getUser;
    }

    async getCurrentUser(): Promise<UserDto> {
        let currentUser = new UserDto();
        const auth = await getAuth();
        currentUser = await this.findOne(auth.currentUser.uid);
        return currentUser;
    }

    create(userDto: UserDto): any {
        return this.usersRef.add({ ...userDto });
    }

    update(id: string, data: any): Promise<void> {
        return this.usersRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.usersRef.doc(id).delete();
    }
}
