
import React from 'react';
import { useForm } from 'react-hook-form';
import { Star, User, Mail, Phone, Flag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from '../context/LanguageContext';

type ReviewFormData = {
  firstName: string;
  email: string;
  phone: string;
  country: string;
  review: string;
};

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ open, onClose }) => {
  const { language } = useLanguage();
  const form = useForm<ReviewFormData>();

  const onSubmit = (data: ReviewFormData) => {
    console.log('Review submitted:', data);
    onClose();
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-cornerstone-orange" />
            {language === 'fr' ? 'Laissez votre avis' : 'Leave your review'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {language === 'fr' ? 'Prénom' : 'First Name'}
                  </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {language === 'fr' ? 'Email' : 'Email'}
                  </FormLabel>
                  <FormControl>
                    <Input type="email" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {language === 'fr' ? 'Téléphone' : 'Phone'}
                  </FormLabel>
                  <FormControl>
                    <Input type="tel" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    {language === 'fr' ? 'Pays' : 'Country'}
                  </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'fr' ? 'Votre avis' : 'Your review'}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={language === 'fr' ? 'Partagez votre expérience...' : 'Share your experience...'}
                      className="min-h-[100px]" 
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                {language === 'fr' ? 'Annuler' : 'Cancel'}
              </Button>
              <Button type="submit">
                {language === 'fr' ? 'Envoyer' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
